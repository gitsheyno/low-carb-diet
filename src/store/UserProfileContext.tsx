import { PropsWithChildren, createContext, useState } from "react";

interface MyContextType {
  completed: boolean;
  handleStatus: () => void;
}

export const userProfileCTX = createContext<MyContextType>({
  completed: false,
  handleStatus: () => {},
});

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStatus = () => {
    setIsCompleted(true);
  };
  return (
    <userProfileCTX.Provider value={{ completed: isCompleted, handleStatus }}>
      {children}
    </userProfileCTX.Provider>
  );
};
