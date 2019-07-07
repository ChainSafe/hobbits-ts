import net from "net";

export const delayedConnection = async (port: number) => {
  return await new Promise((resolve) => {
    const client = net.createConnection({ port });
    client.on('connect', () => {
      setTimeout(() => resolve(), 500);
    });
  });
};
