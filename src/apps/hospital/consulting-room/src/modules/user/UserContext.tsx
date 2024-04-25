import { PropsWithChildren, createContext, useContext } from "react";
import { useApolloContext } from "../shared/ApolloProvider";
import { UserStoreActions, UserServices, ApolloUserRepository, useUserStore, useUserService } from "@ducen-clients/hospital";

export const UserStoreContext = createContext<UserStoreActions & UserServices>({} as UserStoreActions & UserServices);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { client } = useApolloContext();
  const repository = new ApolloUserRepository(client);
  const state = useUserStore();
  const services = useUserService(state, repository);
  return (
    <UserStoreContext.Provider value={{...state, ...services}}>
        {children}
    </UserStoreContext.Provider>
  )
}

export const useUserContext = () => useContext(UserStoreContext);
