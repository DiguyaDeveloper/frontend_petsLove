import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { FaPeopleCarry } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import DashboardCard from 'components/commons/DashboardCard'
import { SEARCH_PROTECTIONIST, SEARCH_VOLANTEERS } from 'routing/routes'
import Title from 'components/commons/Title/Title'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import PetsUserTransit from 'containers/PetsUserTransit'
import PetsFromCreator from 'containers/PetsFromCreator'
import styles from './dashboardTransit.scss'

const DashboardTransit = () => {
  const [swith, setSwith] = useState(false)
  const { t } = useTranslation('dashboard')
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore, searchPetsStore } = rootStore

  const handleMyPets = useCallback(() => {
    setSwith(false)
  }, [])

  const handlePetsCare = useCallback(() => {
    setSwith(true)
  }, [])

  const handleSearchVolanteers = useCallback(() => {
    history.push(SEARCH_VOLANTEERS)
  }, [])

  const handleSearchShelters = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  useEffect(() => {
    searchPetsStore.getPetsUserTransit(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('common:dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          handleClick={handlePetsCare}
          titleCard={t('transitUser.petsCare')}
          total={searchPetsStore.totalPetsTransit}
        />
        <DashboardCard
          handleClick={handleMyPets}
          titleCard={t('common:myPets')}
          total={searchPetsStore.totalPetsForAdoption}
        />
        <DashboardCard
          handleClick={handleSearchVolanteers}
          icon={<AiFillFileAdd size={25} />}
          titleCard={t('transitUser.searchVolanteers')}
        />
        <DashboardCard
          handleClick={handleSearchShelters}
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('transitUser.searchShelters')}
        />
      </div>
      {swith && <PetsUserTransit id={authStore.user._id} />}
      {!swith && (
        <PetsFromCreator
          title={
            searchPetsStore.totalPetsForAdoption.length > 1 ? t('common:myPet') : t('common:myPets')
          }
          id={authStore.user._id}
        />
      )}
    </LayoutContainer>
  )
}

export default observer(DashboardTransit)
