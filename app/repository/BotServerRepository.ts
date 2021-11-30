import { localStorage } from "~/utils/LocalStorage";

export type BotServer = {
  id: string;
  user: string;
  botName: string;
  directionServer: string;
  token: string;
  refresh_token: string;
  select: boolean | number;
  status?: boolean;
  expired?: boolean;
};

export class BotServerRepository {
  SERVER_AUTH = "server_auth";

  store(newServer: BotServer) {
    const storeServers = this.getAll();
    let indexExistServer = this.findIndexById(newServer.id);
    if (indexExistServer != -1) {
      storeServers[indexExistServer] = newServer;
    } else {
      storeServers.push(newServer);
    }

    this.save(storeServers);
  }

  select(id: string) {
    const servers = this.getAll();
    servers.forEach((botServer) => (botServer.select = false));
    const updateServer = servers.find((botServer) => botServer.id === id);
    if (updateServer) {
      updateServer.select = true;
    }
    this.save(servers);
  }

  getAll(): BotServer[] {
    const store = localStorage.getString(this.SERVER_AUTH);
    return store ? JSON.parse(store) : [];
  }

  findById(id: string): BotServer | undefined {
    return this.getAll().find((botServer) => botServer.id === id);
  }

  findByDirectionServer(directionServer: string): BotServer | undefined {
    return this.getAll().find(
      (botServer) => botServer.directionServer === directionServer
    );
  }

  findIndexById(id: string): number {
    return this.getAll().findIndex((botServer) => botServer.id === id);
  }

  findEnable(): BotServer | undefined {
    return (
      JSON.parse(localStorage.getString(this.SERVER_AUTH)) as BotServer[]
    ).find((x) => x.select);
  }

  removeAll() {
    localStorage.remove(this.SERVER_AUTH);
  }

  removeById(id: string) {
    const connections = this.getAll();
    const indexRemove = this.findIndexById(id);
    connections.splice(indexRemove, 1);
    this.save(connections);
  }

  private save(botServers: BotServer[]) {
    localStorage.setString(this.SERVER_AUTH, JSON.stringify(botServers));
  }
}
