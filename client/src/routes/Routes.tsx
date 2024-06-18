import { Routes as RouterRoutes, Router, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import SingleRecipe from '../pages/SingleRecipe';
// import Login from '../../pages/login/Login';
// import Logout from '../../pages/logout/Logout';
// import SignUp from '../../pages/sign-up/SignUp';
// import NotFound from '../../pages/not-found/NotFound';
// import CreateRecipe from '../../pages/create-recipe/CreateRecipe';
// import ProtectedRoute from '../protected-route/ProtectedRoute';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/login' element={<Login />} /> */}
      {/* <Route path='/logout' element={<Logout />} /> */}
      {/* <Route path='/signup' element={<SignUp />} /> */}
      <Route
        path='/recipes'
        element={
          //   <ProtectedRoute>
          <Recipes />
          //   </ProtectedRoute>
        }
      />
      <Route
        path='/recipes/:recipeid'
        element={
          //   <ProtectedRoute>
          <SingleRecipe />
          //   </ProtectedRoute>
        }
      />
      {/* <Route
        path='/create-recipe'
        element={
           <ProtectedRoute>
             <CreateRecipe />
           </ProtectedRoute>
         }
      /> */}
      {/* <Route path='*' element={<NotFound />} /> */}
    </RouterRoutes>
  );
};

export default Routes;