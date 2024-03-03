import { useEffect } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useSharedDispatch } from '../../store/shared/sharedStore'
import { setAccessToken, setUser } from '../../store/shared/sharedSlice'
import { AuthContextProps } from './types'

/**
 * Wrapper component which reads the user data and access token information from Auth0
 * for the currently signed-in user and preserves it at the Shared State for usage within the application.
 * @param props the components that should be secured and need to access the the user and access token information.
 */
const AuthenticationContext = (props: AuthContextProps) => {
    const { user, getAccessTokenSilently } = useAuth0()

    const sharedDispatch = useSharedDispatch()

    useEffect(() => {
        sharedDispatch(setUser(user))
        getAccessTokenSilently().then((token) => {
            sharedDispatch(setAccessToken(token))
        })
    })

    return <>{props.children}</>
}

export default withAuthenticationRequired(AuthenticationContext)