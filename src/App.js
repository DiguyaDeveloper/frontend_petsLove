import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'
import PrivateRoute from 'routing/PrivateRoute'
import {
  DASHBOARD,
  FORGOT_PASSWORD,
  LOGIN,
  HOME,
  REGISTER,
  CREATE_PET,
  PROFILE_PET,
  EDIT_USER,
  SEARCH_VOLANTEERS,
  PETS_ADOPTER,
  EDIT_PET,
  PROFILE_USER,
  RESET_PASSWORD,
  SEARCH_PROTECTIONIST,
} from 'routing/routes'
import RootStore from 'stores/RootStore'
import PageNotFound from 'components/commons/PageNotFound'
import UserContext from 'Context/UserContext'
import ForgotPassword from 'containers/ForgotPassword'
import ProfilePets from 'containers/ProfilePets'
import dotenv from 'dotenv'
import SearchVolunteers from 'containers/SearchVolunteers'
import PetsAdopted from 'containers/PetsAdopted'
import Dashboard from 'containers/Dashboard'
import EditUser from 'containers/EditUser/EditUser'
import CreatePet from 'containers/CreatePet'
import Register from 'containers/Register'
import Login from 'containers/Login'
import Home from 'containers/Home'
import ProfileUser from 'containers/ProfileUser'
import EditPet from 'containers/EditPet'
import ResetPassword from 'containers/ResetPassword'
import SearchProtectionist from 'containers/SearchProtectionist/SearchProtectionist'
import Navbar from 'components/commons/Navbar'
import axiosInterceptors from './utils/axiosInterceptors'
import historyBrowser from './history'

import 'aos/dist/aos.css'
import './App.scss'

dotenv.config()
const rootStore = new RootStore()

axiosInterceptors(rootStore)

function App() {
  return (
    <UserContext.Provider value={rootStore}>
      <Router history={historyBrowser}>
        <ScrollMemory />
        <Navbar>
          <Switch>
            <Route exact path={REGISTER} component={Register} />
            <Route exact path={RESET_PASSWORD} component={ResetPassword} />
            <Route exact path={LOGIN} component={Login} />
            <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={HOME} component={Home} />
            <Route exact path={`${PROFILE_PET}/:id`} component={ProfilePets} />
            <Route exact path={`${PROFILE_USER}/:id`} component={ProfileUser} />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={DASHBOARD}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={CREATE_PET}
              component={CreatePet}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={`${EDIT_PET}/:id`}
              component={EditPet}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={`${EDIT_USER}/:id`}
              component={EditUser}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={SEARCH_VOLANTEERS}
              component={SearchVolunteers}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={SEARCH_PROTECTIONIST}
              component={SearchProtectionist}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={PETS_ADOPTER}
              component={PetsAdopted}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Navbar>
      </Router>
    </UserContext.Provider>
  )
}

export default observer(App)
