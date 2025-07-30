declare global {
  interface IReport {
    _id: string;
    dateRaised: Date;
    dateCleared: Date;
    techlogRaised: number;
    techlogCleared: number;
    description: string;
    status: string;
    note: string;
  }
}
