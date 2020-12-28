export interface Node {
  type?: string;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nodes?: Node[];
}
