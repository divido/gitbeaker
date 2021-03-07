import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

const url = (userId?: number) =>
  userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails';

export class UserEmails<C extends boolean = false> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get()(this, url(userId), options);
  }

  add(email: string, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post()(this, url(userId), {
      email,
      ...options,
    });
  }

  show(emailId: number, options?: BaseRequestOptions) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get()(this, `user/emails/${eId}`, options);
  }

  remove(emailId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.del()(this, `${url(userId)}/${eId}`, options);
  }
}
