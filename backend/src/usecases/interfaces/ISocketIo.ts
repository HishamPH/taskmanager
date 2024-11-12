export default interface ISocketIo {
  updateTask(userId: string, task: any): Promise<any>;
}
