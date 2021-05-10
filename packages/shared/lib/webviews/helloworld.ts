export const WEBVIEW_URI = "/helloworld";

export interface IWebviewProps {
  name: string;
}

export interface IOnWebviewProps {
  onHelloWorld: ({ name }: { name: string }) => void;
}

type ActionFactoryType = (
  sendPostMessage: (data: any) => void
) => {
  [key in keyof IOnWebviewProps]: (name: string) => void;
};

export type ActionType = ReturnType<ActionFactoryType>;

export const actionFactory: ActionFactoryType = (sendPostMessage: any) => {
  return {
    onHelloWorld: (name: string) => {
      sendPostMessage({
        action: "onHelloWorld",
        payload: { name }
      });
    }
  };
};
