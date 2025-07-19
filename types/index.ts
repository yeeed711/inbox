export interface InboxItemType {
  id: string;
  time: string;
  title: string;
  badges: {
    text: string;
    color: string;
  }[];
}
