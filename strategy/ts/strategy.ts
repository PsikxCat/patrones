interface Strategy {
  login(user: string, password: string): boolean
}

class LoginContext {
  private strategy: Strategy

  constructor(strategy: Strategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password)
  }
}

class GoogleLoginStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log(`Logging in with Google: ${user}`)
    return true
  }
}

class DBLoginStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log(`Logging in with DB: ${user}`)
    return false
  }
}

const googleLogin = new GoogleLoginStrategy()
const dbLogin = new DBLoginStrategy()
const loginContext = new LoginContext(googleLogin)

const login1 = loginContext.login('user', 'password') // Logging in with Google: user
console.log(login1) // true

loginContext.setStrategy(dbLogin)

const login2 = loginContext.login('user', 'password') // Logging in with DB: user
console.log(login2) // false
