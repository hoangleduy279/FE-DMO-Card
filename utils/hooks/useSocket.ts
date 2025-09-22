import { useEffect } from 'react';
import io from 'socket.io-client';

import { appConfig } from '@utils/configs';

const socket = io(appConfig.API_URL);

const useSocket = (eventName: string | string[], callBack: (data: any) => void) => {
    useEffect(() => {
        if (typeof eventName === 'string') {
            if (!Array.isArray(callBack)) {
                socket.on(eventName, callBack);

                return () => {
                    socket.off(eventName, callBack);
                };
            }
        } else {
            for (const event of eventName) {
                socket.on(event, callBack);
            }

            return () => {
                for (const event of eventName) {
                    socket.off(event, callBack);
                }
            };
        }
    }, [eventName, callBack]);

    return socket;
};

export default useSocket;
