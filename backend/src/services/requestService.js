import logger from '../logger';
import CollectionRequest from '../models/CollectionRequest';

class RequestService {
    async createRequest(requestData) {
        try {
            const { requester, collector, items, status, scheduledAt, priority, metadata, notes } =
                requestData;
            const request = new CollectionRequest({
                requester,
                collector,
                items,
                status,
                scheduledAt,
                priority,
                metadata,
                notes,
            });
            await request.save();
        } catch (e) {
            logger.error(`Error creating request: ${e}`);
        }
    }
}
