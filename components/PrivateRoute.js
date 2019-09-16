import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
...

</Switch >
    <Route exact path="/" component={Public} />
    <PrivateRoute path ="/authenticated" component=()