declare global {
  interface ITemplate {
    _id: string;
    templateName: string;
    createdBy: string;
    createdAt: string;
    status: boolean;
  }
}
