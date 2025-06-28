import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type: string;
  data: any;
}

interface UseWebSocketReturn {
  lastMessage: WebSocketMessage | null;
  readyState: number;
  sendMessage: (message: any) => void;
}

export function useWebSocket(url: string): UseWebSocketReturn {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('[websocket] Connected to server');
      setReadyState(WebSocket.OPEN);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      } catch (error) {
        console.error('[websocket] Failed to parse message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('[websocket] Disconnected from server');
      setReadyState(WebSocket.CLOSED);
    };

    ws.current.onerror = (error) => {
      console.error('[websocket] Connection error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('[websocket] Cannot send message - connection not open');
    }
  };

  return {
    lastMessage,
    readyState,
    sendMessage
  };
}