const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateMeetingId: Promise<string> = new Promise((res, rej) => {
    let id: string = '';
    for (let i = 0; i < 9; i++) {
      if (id.length === 3) {
        id += "-";
      }
      if (id.length === 7) {
        id += "-";
      }
      id += base62[Math.floor(Math.random() * 62)];
    }
    res(id);
  });
