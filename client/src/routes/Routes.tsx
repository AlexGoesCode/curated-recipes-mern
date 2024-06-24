import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import SingleRecipe from '../pages/SingleRecipe';
import TestReact from '../components/foo/TestReact';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import SignUp from '../pages/SignUp';
// import NotFound from '../../pages/not-found/NotFound';
import CreateRecipe from '../pages/CreateRecipe';
import SavedRecipes from '../pages/SavedRecipes'; // Import the SavedRecipes component
// import ProtectedRoute from '../protected-route/ProtectedRoute';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/signup' element={<SignUp />} />
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
      <Route
        path='/testreact'
        element={
          //   <ProtectedRoute>
          <TestReact />
          //   </ProtectedRoute>
        }
      />
      <Route
        path='/create-recipe'
        element={
          //  <ProtectedRoute>
          <CreateRecipe />
          //  </ProtectedRoute>
        }
      />
      <Route
        path='/saved-recipes'
        element={
          //  <ProtectedRoute>
          <SavedRecipes />
          //  </ProtectedRoute>
        }
      />
      {/* <Route path='*' element={<NotFound />} /> */}
    </RouterRoutes>
  );
};

export default Routes;
