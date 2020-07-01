import React, { useCallback, useContext, useState, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory, useParams } from 'react-router'
import c from 'classnames'
import { GiHealthPotion } from 'react-icons/gi'
import { MdEditLocation, MdPets } from 'react-icons/md'
import LayoutContainer from 'components/commons/LayoutContainer'
import Button from 'components/commons/Button'
import CreatePetStore from 'stores/CreatePetStore'
import InputUploadImageStore from 'stores/InputUploadImageStore'
import BasicFormPet from './BasicFormPet/BasicFormPet'
import LocationFormPet from './LocationFormPet/LocationFormPet'
import MedicalReportsPets from './MedicalReportsPets/MedicalReportsPets'
import styles from './createPet.scss'

const CreatePet = ({ title, isEdit }) => {
  const createPetStore = useLocalStore(() => new CreatePetStore())
  const inputUploadImageStore = useLocalStore(() => new InputUploadImageStore())
  const { t } = useTranslation('createPet')
  const history = useHistory()
  const { id } = useParams()
  const [step, setStep] = useState(1)

  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const handleSave = useCallback(() => {
    if (id) {
      createPetStore.uploadImage(inputUploadImageStore.getImage)
      return
    }
    createPetStore.saveImageCreation(inputUploadImageStore.getImage)
  }, [])

  const handleNext = () => {
    if (step === 1) {
      if (createPetStore.firstStepValidation()) {
        setStep(step + 1)
      }
    }
    if (step === 2) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    if (createPetStore.requestSuccess) {
      history.push(`/dashboard`)
    }
  }, [createPetStore.requestSuccess])

  useEffect(() => {
    if (id) {
      createPetStore.findOnePet(id)
    }
    createPetStore.pet.setIdUserCreator(authStore.user._id)
  }, [])

  function getStepForm() {
    if (step === 1) {
      return (
        <BasicFormPet
          isEdit={isEdit}
          createPetStore={createPetStore}
          inputUploadImageStore={inputUploadImageStore}
        />
      )
    }

    if (step === 2) {
      return <MedicalReportsPets isEdit={isEdit} createPetStore={createPetStore} />
    }

    return <LocationFormPet isEdit={isEdit} createPetStore={createPetStore} />
  }

  return (
    <LayoutContainer title={c(isEdit ? title : t('title'))}>
      <div className={styles.containerSteps}>
        <Tooltip title={t('subtitleStepOne')}>
          <div className={c(styles.stepInformation, step === 1 && styles.formSelected)}>
            <MdPets size={20} />
          </div>
        </Tooltip>
        <Tooltip title={t('subtitleStepTwo')}>
          <div className={c(styles.stepInformation, step === 2 && styles.formSelected)}>
            <GiHealthPotion size={20} />
          </div>
        </Tooltip>
        <Tooltip title={t('subtitleStepThree')}>
          <div className={c(styles.stepInformation, step === 3 && styles.formSelected)}>
            <MdEditLocation size={20} />
          </div>
        </Tooltip>
        <div className={styles.stepLine} />
      </div>
      {getStepForm()}
      <div className={styles.containerButton}>
        <div className={styles.button}>
          <Button disable={step === 1} handleClick={handleBack} text={t('back')} />
        </div>
        {step === 3 ? (
          <div className={styles.button}>
            <Button handleClick={handleSave} text={t('save')} />
          </div>
        ) : (
          <div className={styles.button}>
            <Button handleClick={handleNext} text={t('next')} />
          </div>
        )}
      </div>
    </LayoutContainer>
  )
}

CreatePet.prototype = {
  title: PropTypes.string,
  isEdit: PropTypes.bool,
  inputUploadImageStore: PropTypes.instanceOf(InputUploadImageStore),
}

CreatePet.defaultProps = {
  name: '',
  isEdit: false,
}

export default observer(CreatePet)
