(globalThis as any)['ngxConsoleFilter'] = (_level: string, _message: any): boolean => {
  return true;
};
export class NgxConsole {
  public log(message: any, reason?: any): void {
    if ((globalThis as any)['ngxConsoleFilter']('log', message)) {
      if (reason !== undefined) {
        console.log(message, reason);
      } else {
        console.log(message);
      }
    }
  }
  public error(message: any, reason?: any): void {
    if ((globalThis as any)['ngxConsoleFilter']('error', message)) {
      if (reason !== undefined) {
        console.error(message, reason);
      } else {
        console.error(message);
      }
    }
  }
  public warn(message: any, reason?: any): void {
    if ((globalThis as any)['ngxConsoleFilter']('warn', message)) {
      if (reason !== undefined) {
        console.warn(message, reason);
      } else {
        console.warn(message);
      }
    }
  }
}

(globalThis as any)['ngxConsole'] = new NgxConsole();
