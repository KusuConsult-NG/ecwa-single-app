import { NextRequest, NextResponse } from "next/server"

// ECWA organizational data - this would typically come from a real database
const ECWA_DATA = {
  dccs: [
    {
      id: 'dcc-jos',
      name: 'ECWA Jos DCC',
      location: 'Jos, Plateau State',
      state: 'Plateau',
      established: '1985',
      chairman: 'Rev. Dr. John Doe',
      secretary: 'Pastor Jane Smith',
      totalLCCs: 8,
      totalLCs: 32,
      totalMembers: 8500
    },
    {
      id: 'dcc-kaduna',
      name: 'ECWA Kaduna DCC',
      location: 'Kaduna, Kaduna State',
      state: 'Kaduna',
      established: '1987',
      chairman: 'Rev. Dr. Michael Johnson',
      secretary: 'Pastor Sarah Williams',
      totalLCCs: 12,
      totalLCs: 48,
      totalMembers: 12000
    },
    {
      id: 'dcc-abuja',
      name: 'ECWA Abuja DCC',
      location: 'Abuja, FCT',
      state: 'FCT',
      established: '1990',
      chairman: 'Rev. Dr. David Brown',
      secretary: 'Pastor Mary Davis',
      totalLCCs: 6,
      totalLCs: 24,
      totalMembers: 6000
    },
    {
      id: 'dcc-kano',
      name: 'ECWA Kano DCC',
      location: 'Kano, Kano State',
      state: 'Kano',
      established: '1988',
      chairman: 'Rev. Dr. Ahmed Hassan',
      secretary: 'Pastor Fatima Ali',
      totalLCCs: 10,
      totalLCs: 40,
      totalMembers: 9500
    },
    {
      id: 'dcc-lagos',
      name: 'ECWA Lagos DCC',
      location: 'Lagos, Lagos State',
      state: 'Lagos',
      established: '1992',
      chairman: 'Rev. Dr. Peter Okonkwo',
      secretary: 'Pastor Grace Okafor',
      totalLCCs: 15,
      totalLCs: 60,
      totalMembers: 15000
    },
    {
      id: 'dcc-port-harcourt',
      name: 'ECWA Port Harcourt DCC',
      location: 'Port Harcourt, Rivers State',
      state: 'Rivers',
      established: '1991',
      chairman: 'Rev. Dr. Samuel Eze',
      secretary: 'Pastor Joy Nwosu',
      totalLCCs: 9,
      totalLCs: 36,
      totalMembers: 7200
    }
  ],
  lccs: [
    {
      id: 'lcc-jos-central',
      name: 'ECWA Jos Central LCC',
      parentDcc: 'dcc-jos',
      location: 'Jos Central, Plateau State',
      state: 'Plateau',
      established: '1990',
      lo: 'Pastor James Wilson',
      secretary: 'Pastor Elizabeth Taylor',
      totalLCs: 4,
      totalMembers: 1200
    },
    {
      id: 'lcc-jos-north',
      name: 'ECWA Jos North LCC',
      parentDcc: 'dcc-jos',
      location: 'Jos North, Plateau State',
      state: 'Plateau',
      established: '1992',
      lo: 'Pastor Robert Anderson',
      secretary: 'Pastor Linda Martinez',
      totalLCs: 3,
      totalMembers: 900
    },
    {
      id: 'lcc-kaduna-central',
      name: 'ECWA Kaduna Central LCC',
      parentDcc: 'dcc-kaduna',
      location: 'Kaduna Central, Kaduna State',
      state: 'Kaduna',
      established: '1989',
      lo: 'Pastor Mohammed Ibrahim',
      secretary: 'Pastor Aisha Yusuf',
      totalLCs: 5,
      totalMembers: 1500
    },
    {
      id: 'lcc-abuja-central',
      name: 'ECWA Abuja Central LCC',
      parentDcc: 'dcc-abuja',
      location: 'Abuja Central, FCT',
      state: 'FCT',
      established: '1995',
      lo: 'Pastor Daniel Okafor',
      secretary: 'Pastor Blessing Adebayo',
      totalLCs: 2,
      totalMembers: 600
    }
  ],
  lcs: [
    {
      id: 'lc-jos-central-1',
      name: 'ECWA Jos Central LC',
      parentLcc: 'lcc-jos-central',
      location: 'Jos Central, Plateau State',
      state: 'Plateau',
      established: '1995',
      seniorMinister: 'Pastor John Smith',
      secretary: 'Pastor Mary Johnson',
      totalMembers: 300
    },
    {
      id: 'lc-jos-central-2',
      name: 'ECWA Jos Central LC 2',
      parentLcc: 'lcc-jos-central',
      location: 'Jos Central, Plateau State',
      state: 'Plateau',
      established: '1998',
      seniorMinister: 'Pastor David Brown',
      secretary: 'Pastor Sarah Wilson',
      totalMembers: 250
    },
    {
      id: 'lc-kaduna-central-1',
      name: 'ECWA Kaduna Central LC',
      parentLcc: 'lcc-kaduna-central',
      location: 'Kaduna Central, Kaduna State',
      state: 'Kaduna',
      established: '1992',
      seniorMinister: 'Pastor Ahmed Hassan',
      secretary: 'Pastor Fatima Ali',
      totalMembers: 400
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const parentId = searchParams.get('parentId')

    let data: any = {}

    switch (type) {
      case 'dccs':
        data = { dccs: ECWA_DATA.dccs }
        break
      case 'lccs':
        if (parentId) {
          data = { lccs: ECWA_DATA.lccs.filter(lcc => lcc.parentDcc === parentId) }
        } else {
          data = { lccs: ECWA_DATA.lccs }
        }
        break
      case 'lcs':
        if (parentId) {
          data = { lcs: ECWA_DATA.lcs.filter(lc => lc.parentLcc === parentId) }
        } else {
          data = { lcs: ECWA_DATA.lcs }
        }
        break
      case 'all':
      default:
        data = ECWA_DATA
        break
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'ECWA data retrieved successfully'
    })

  } catch (error) {
    console.error('Error fetching ECWA data:', error)
    return NextResponse.json(
      { error: "Failed to fetch ECWA data" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // This would typically save to a real database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: `${type} data updated successfully`,
      data
    })

  } catch (error) {
    console.error('Error updating ECWA data:', error)
    return NextResponse.json(
      { error: "Failed to update ECWA data" },
      { status: 500 }
    )
  }
}
