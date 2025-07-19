export interface InboxItem {
  id: string;
  time: string;
  title: string;
  badge: {
    text: string;
    color: string;
  };
}
