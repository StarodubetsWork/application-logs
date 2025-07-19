import { observable } from 'micro-observables';
import type { ILog, IApiResponse } from '@interfaces';
import { env, texts } from '@config';
import { toastService } from './toastService';

const mapLogDates = (log: ILog): ILog => ({
  ...log,
  createdAt: new Date(log.createdAt),
  updatedAt: new Date(log.updatedAt),
});

class LogsService {
  private baseUrl = env.API_BASE_URL;
  private isFetching = false; // Flag to prevent concurrent fetches

  private _logs = observable<ILog[]>([]);
  private _loading = observable<boolean>(false);
  private _error = observable<string | null>(null);

  public logs = this._logs.readOnly();
  public loading = this._loading.readOnly();
  public error = this._error.readOnly();

  public async fetchLogs(): Promise<void> {
    // Prevent duplicate concurrent fetches (especially during React StrictMode double-invocation)
    if (this.isFetching) {
      return;
    }

    try {
      this.isFetching = true;
      this._loading.set(true);
      this._error.set(null);

      const response = await fetch(`${this.baseUrl}/logs`);
      const result: IApiResponse<ILog[]> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || texts.notifications.log.fetchError);
      }

      const logs = result.data.map(mapLogDates);

      this._logs.set(logs);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : texts.notifications.log.fetchError;
      this._error.set(errorMessage);
    } finally {
      this.isFetching = false;
      this._loading.set(false);
    }
  }

  public async createLog(owner: string, text: string): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);

      const response = await fetch(`${this.baseUrl}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner, text }),
      });

      const result: IApiResponse<ILog> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || texts.notifications.log.createError);
      }

      // Show success toast
      toastService.success(`${texts.notifications.log.createdFor} ${owner}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : texts.notifications.log.createError;
      this._error.set(errorMessage);

      // Show error toast
      toastService.error(`${texts.notifications.log.createError}: ${errorMessage}`);
      throw error; // Re-throw to maintain existing error handling
    } finally {
      this._loading.set(false);
    }
  }

  public async updateLog(id: string, updates: { owner?: string; text?: string }): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);

      const response = await fetch(`${this.baseUrl}/logs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result: IApiResponse<ILog> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || texts.notifications.log.updateError);
      }

      // Show success toast
      toastService.success(texts.notifications.log.updated);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : texts.notifications.log.updateError;
      this._error.set(errorMessage);

      toastService.error(`${texts.notifications.log.updateError}: ${errorMessage}`);
      throw error; // Re-throw to maintain existing error handling
    } finally {
      this._loading.set(false);
    }
  }

  public async deleteLog(id: string): Promise<void> {
    const currentLogs = this._logs.get();
    const logToDelete = currentLogs.find(log => log.id === id);

    try {
      this._loading.set(true);
      this._error.set(null);

      const response = await fetch(`${this.baseUrl}/logs/${id}`, {
        method: 'DELETE',
      });

      const result: IApiResponse<ILog> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || texts.notifications.log.deleteError);
      }

      // Show success toast
      const ownerName = logToDelete?.owner || 'Unknown';
      toastService.success(texts.notifications.log.deletedBy.replace('{owner}', ownerName));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : texts.notifications.log.deleteError;
      this._error.set(errorMessage);

      toastService.error(`${texts.notifications.log.deleteError}: ${errorMessage}`);
      throw error; // Re-throw to maintain existing error handling
    } finally {
      this._loading.set(false);
    }
  }

  public clearError(): void {
    this._error.set(null);
  }

  public resetLogsData(): void {
    this._logs.set([]);
    this._loading.set(false);
    this._error.set(null);
  }
}

export default new LogsService();
