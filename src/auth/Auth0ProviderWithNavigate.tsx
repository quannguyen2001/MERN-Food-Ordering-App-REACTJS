import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithnavigate = ({ children }: Props) => {
    // const { createUser } = useCreateMyUser();
    const navigate = useNavigate();
    // const { getAccessTokenSilently } = useAuth0();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialise auth");
    }

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || "/auth-callback")
    };

    // const onRedirectCallback = async(appState?: AppState, user?: User) => {
    //     // console.log("USER", user);
    //     // if (user?.sub && user?.email) {
    //     //     createUser({ auth0Id: user.sub, email: user.email });
    //     // }
    //     const token = await getAccessTokenSilently();
    //     console.log("token",token);
    //     navigate("/auth-callback")
    // };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >{children}</Auth0Provider>
    )
};

export default Auth0ProviderWithnavigate;