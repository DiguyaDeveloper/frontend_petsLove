import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ImageProfilePet from 'components/ImageProfilePet'
import InformationPet from 'components/InformationPet'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import PetIdStore from 'stores/PetIdStore'
import MedicalInformationDog from 'components/MedicalInformationDog'
import ButtonShare from 'components/commons/ButtonShare'
import MedicalInformationCat from 'components/MedicalInformationCat'
import UserContext from 'Context/UserContext'
import TextCard from 'components/commons/TextCard'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ store }) => {
  const [userCanEdit, setUserCanEdit] = useState(false)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { t } = useTranslation('profilePets')

  const {
    getName,
    category,
    getHistory,
    getCategory,
    textAddress,
    foundLocation,
    userVetId,
    userCreatorId,
    userAdopterId,
    userTransitId,
    getImagePreviews,
  } = store.pet

  useEffect(() => {
    if (
      authStore.user._id === userCreatorId.value ||
      authStore.user._id === userVetId.value ||
      authStore.user._id === userAdopterId.value ||
      authStore.user._id === userTransitId.value
    ) {
      setUserCanEdit(true)
    }
  }, [
    userAdopterId.value,
    userVetId.value,
    userAdopterId.value,
    userTransitId.value,
    userCreatorId.value,
  ])

  const { phone } = store

  return (
    <>
      <div className={styles.header}>
        <Title title={t('title', { name: getName })} />
        <ButtonShare phone={phone} route="edit-pet" canView={userCanEdit} />
      </div>
      <div className={styles.colums}>
        <ImageProfilePet image={getImagePreviews} />
        <GoogleMapsLocation
          isProfilePet
          location={foundLocation.value}
          petLocation={textAddress.value}
        />
      </div>
      <div className={styles.colums}>
        <InformationPet title={t('basicInformation')} pet={store.pet} />
        {getCategory === 'dog' && (
          <>
            <MedicalInformationDog title={t('medicalInformation')} pet={store.pet} />
          </>
        )}
        {category.value === 'cat' && (
          <>
            <MedicalInformationCat title={t('medicalInformation')} pet={store.pet} />
          </>
        )}
      </div>
      <div className={styles.colums}>
        {getHistory && <TextCard title={t('history')} text={getHistory} />}
        {store.pet.medicalInformationDog.notes.value && (
          <TextCard title={t('common:notes')} text={store.pet.medicalInformationDog.notes.value} />
        )}
        {store.pet.medicalInformationCat.notes.value && (
          <TextCard title={t('common:notes')} text={store.pet.medicalInformationCat.notes.value} />
        )}
      </div>
    </>
  )
}

LayoutProfilePets.propTypes = {
  store: PropTypes.instanceOf(PetIdStore).isRequired,
}

export default observer(LayoutProfilePets)
