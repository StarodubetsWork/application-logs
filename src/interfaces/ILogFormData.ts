import type { ILog } from "./ILog";

export interface ILogFormData extends Pick<ILog, 'owner' | 'text'> {}
