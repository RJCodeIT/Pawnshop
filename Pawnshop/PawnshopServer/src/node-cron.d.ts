declare module "node-cron" {
  export function schedule(cronExpression: string, task: () => void): void;
}
