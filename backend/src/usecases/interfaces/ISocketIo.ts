export default interface ISocketIo {
  updateTask(userId: string): Promise<any>;
}
