import { hashPassword } from './auth'

// In-memory database for single app (replace with real database in production)
class Database {
  private users: any[] = []
  private sessions: Map<string, { userId: string; expires: Date }> = new Map()
  private financials: Map<string, any[]> = new Map()
  private members: Map<string, any[]> = new Map()
  private expenditures: Map<string, any[]> = new Map()
  private agencies: Map<string, any[]> = new Map()
  private staff: Map<string, any[]> = new Map()
  private requisitions: Map<string, any[]> = new Map()
  private leaders: Map<string, any[]> = new Map()

  private initialized = false
  private defaultOrgId = "ecwa-main"

  private async initializeSampleData() {
    if (this.initialized) return
    this.initialized = true

    // Initialize sample users
    const adminUser = await this.createUser({
      email: 'admin@ecwa.app',
      name: 'Admin User',
      role: 'Admin',
      permissions: ['*']
    })
    await this.updateUser(adminUser.id, { passwordHash: hashPassword('admin123') })

    const treasurerUser = await this.createUser({
      email: 'treasurer@ecwa.app',
      name: 'Treasurer User',
      role: 'Treasurer',
      permissions: ['financials.read', 'financials.write', 'expenditures.read', 'expenditures.write']
    })
    await this.updateUser(treasurerUser.id, { passwordHash: hashPassword('treasurer123') })

    // Initialize sample data
    this.financials.set(this.defaultOrgId, [
      {
        id: 'fin_1',
        type: 'income',
        amount: 50000,
        description: 'Tithe Collection',
        date: new Date().toISOString(),
        category: 'Tithe'
      }
    ])

    this.members.set(this.defaultOrgId, [
      {
        id: 'mem_1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+2348012345678',
        address: '123 Main St, Jos',
        membershipDate: new Date().toISOString(),
        status: 'active'
      }
    ])

    this.leaders.set(this.defaultOrgId, [
      {
        id: 'leader_1',
        name: 'Pastor John Smith',
        email: 'pastor@ecwa.app',
        phone: '+2348012345678',
        role: 'Senior Minister',
        portfolio: 'Pastoral Care',
        status: 'active',
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 'leader_2',
        name: 'Mrs. Sarah Johnson',
        email: 'accountant@ecwa.app',
        phone: '+2348012345679',
        role: 'Accountant',
        portfolio: 'Financial Management',
        status: 'active',
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 'leader_3',
        name: 'Mr. David Wilson',
        email: 'auditor@ecwa.app',
        phone: '+2348012345680',
        role: 'Auditor',
        portfolio: 'Financial Oversight',
        status: 'active',
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ])
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeSampleData()
    }
  }

  // User management
  async createUser(user: any): Promise<any> {
    await this.ensureInitialized()
    const newUser = {
      ...user,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    this.users.push(newUser)
    return newUser
  }

  async getUserByEmail(email: string): Promise<any | null> {
    await this.ensureInitialized()
    return this.users.find(u => u.email === email) || null
  }

  async getUserById(id: string): Promise<any | null> {
    await this.ensureInitialized()
    return this.users.find(u => u.id === id) || null
  }

  async updateUser(id: string, updates: any): Promise<any | null> {
    await this.ensureInitialized()
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex !== -1) {
    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    return this.users[userIndex]
  }
    return null
  }

  // Session management
  async createSession(userId: string): Promise<string> {
    await this.ensureInitialized()
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.sessions.set(sessionId, {
      userId,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    })
    return sessionId
  }

  async getSession(sessionId: string): Promise<any | null> {
    await this.ensureInitialized()
    const session = this.sessions.get(sessionId)
    if (session && session.expires > new Date()) {
      return await this.getUserById(session.userId)
    }
    return null
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.ensureInitialized()
    this.sessions.delete(sessionId)
  }

  // Financial management
  async getFinancials(): Promise<any[]> {
    await this.ensureInitialized()
    return this.financials.get(this.defaultOrgId) || []
  }

  async createFinancial(data: any): Promise<any> {
    await this.ensureInitialized()
    const financial = {
      ...data,
      id: `fin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.financials.get(this.defaultOrgId) || []
    current.push(financial)
    this.financials.set(this.defaultOrgId, current)
    return financial
  }

  // Members management
  async getMembers(): Promise<any[]> {
    await this.ensureInitialized()
    return this.members.get(this.defaultOrgId) || []
  }

  async createMember(data: any): Promise<any> {
    await this.ensureInitialized()
    const member = {
      ...data,
      id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.members.get(this.defaultOrgId) || []
    current.push(member)
    this.members.set(this.defaultOrgId, current)
    return member
  }

  // Expenditures management
  async getExpenditures(): Promise<any[]> {
    await this.ensureInitialized()
    return this.expenditures.get(this.defaultOrgId) || []
  }

  async createExpenditure(data: any): Promise<any> {
    await this.ensureInitialized()
    const expenditure = {
      ...data,
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.expenditures.get(this.defaultOrgId) || []
    current.push(expenditure)
    this.expenditures.set(this.defaultOrgId, current)
    return expenditure
  }

  // Agencies management
  async getAgencies(): Promise<any[]> {
    await this.ensureInitialized()
    return this.agencies.get(this.defaultOrgId) || []
  }

  async createAgency(data: any): Promise<any> {
    await this.ensureInitialized()
    const agency = {
      ...data,
      id: `agency_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.agencies.get(this.defaultOrgId) || []
    current.push(agency)
    this.agencies.set(this.defaultOrgId, current)
    return agency
  }

  // Staff management
  async getStaff(): Promise<any[]> {
    await this.ensureInitialized()
    return this.staff.get(this.defaultOrgId) || []
  }

  async createStaff(data: any): Promise<any> {
    await this.ensureInitialized()
    const staff = {
      ...data,
      id: `staff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.staff.get(this.defaultOrgId) || []
    current.push(staff)
    this.staff.set(this.defaultOrgId, current)
    return staff
  }

  // Requisitions management
  async getRequisitions(): Promise<any[]> {
    await this.ensureInitialized()
    return this.requisitions.get(this.defaultOrgId) || []
  }

  async createRequisition(data: any): Promise<any> {
    await this.ensureInitialized()
    const requisition = {
      ...data,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.requisitions.get(this.defaultOrgId) || []
    current.push(requisition)
    this.requisitions.set(this.defaultOrgId, current)
    return requisition
  }

  async getRequisition(id: string): Promise<any | null> {
    await this.ensureInitialized()
    const requisitions = this.requisitions.get(this.defaultOrgId) || []
    return requisitions.find(r => r.id === id) || null
  }

  async updateRequisition(id: string, updates: any): Promise<any | null> {
    await this.ensureInitialized()
    const requisitions = this.requisitions.get(this.defaultOrgId) || []
    const reqIndex = requisitions.findIndex(r => r.id === id)
      if (reqIndex !== -1) {
      requisitions[reqIndex] = { ...requisitions[reqIndex], ...updates }
      this.requisitions.set(this.defaultOrgId, requisitions)
      return requisitions[reqIndex]
    }
    return null
  }

  // Leaders management
  async getLeaders(): Promise<any[]> {
    await this.ensureInitialized()
    return this.leaders.get(this.defaultOrgId) || []
  }

  async createLeader(data: any): Promise<any> {
    await this.ensureInitialized()
    const leader = {
      ...data,
      id: `leader_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    const current = this.leaders.get(this.defaultOrgId) || []
    current.push(leader)
    this.leaders.set(this.defaultOrgId, current)
    return leader
  }

  async getLeader(id: string): Promise<any | null> {
    await this.ensureInitialized()
    const leaders = this.leaders.get(this.defaultOrgId) || []
    return leaders.find(l => l.id === id) || null
  }

  async updateLeader(id: string, updates: any): Promise<any | null> {
    await this.ensureInitialized()
    const leaders = this.leaders.get(this.defaultOrgId) || []
      const leaderIndex = leaders.findIndex(l => l.id === id)
      if (leaderIndex !== -1) {
        leaders[leaderIndex] = { ...leaders[leaderIndex], ...updates }
      this.leaders.set(this.defaultOrgId, leaders)
        return leaders[leaderIndex]
    }
    return null
  }

  async deleteLeader(id: string): Promise<boolean> {
    await this.ensureInitialized()
    const leaders = this.leaders.get(this.defaultOrgId) || []
      const leaderIndex = leaders.findIndex(l => l.id === id)
      if (leaderIndex !== -1) {
        leaders.splice(leaderIndex, 1)
      this.leaders.set(this.defaultOrgId, leaders)
        return true
    }
    return false
  }
}

export const db = new Database()