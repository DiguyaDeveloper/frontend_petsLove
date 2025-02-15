import { FormikErrors, FormikValues } from 'formik'
import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { BasePhoneInput } from '../../../../components/BasePhoneInput'
import { User } from '../../constants'

interface Props {
  user: User
  errors: FormikErrors<User>
  values: FormikValues
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (field: string, value: string) => void
}

export const SocialMediaForm: FC<Props> = ({
  user,
  errors,
  values,
  handleChange,
  setFieldValue,
}) => (
  <div className="divide-y mt-14 divide-white/5">
    <div className="flex pr-5 md:pr-12 gap-10">
      <div className="w-[50%]">
        <h2 className="text-base font-semibold leading-7 text-primary-950">
          Social Media and contacts
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          The social media you want to share with the community, it's important
          to have a way to contact you.
        </p>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
          <div className="sm:col-span-3">
            <BaseInput
              label="Instagram"
              placeholder="@refigyPaw"
              handleChange={handleChange}
              name="socialMedia.instagram"
              value={
                values?.socialMedia?.instagram || user?.socialMedia?.instagram
              }
            />
          </div>
          <div className="sm:col-span-3">
            <BaseInput
              label="Facebook"
              name="socialMedia.facebook"
              handleChange={handleChange}
              error={errors?.socialMedia?.facebook || ''}
              placeholder="https://www.facebook.com/refigyPaw/"
              value={
                values?.socialMedia?.facebook || user?.socialMedia?.facebook
              }
            />
          </div>
          <div className="sm:col-span-3">
            <BasePhoneInput
              label="Whatsapp"
              name="socialMedia.whatsapp"
              setFieldValue={setFieldValue}
              value={
                values?.socialMedia?.whatsapp || user?.socialMedia?.whatsapp
              }
              error={errors?.socialMedia?.whatsapp}
            />
          </div>
          <div className="sm:col-span-3">
            <BaseInput
              label="Telegram"
              name="socialMedia.telegram"
              handleChange={handleChange}
              placeholder="Add your username"
              error={errors?.socialMedia?.telegram}
              value={
                values?.socialMedia?.telegram || user?.socialMedia?.telegram
              }
            />
          </div>
        </div>
        <div className="mt-8 flex">
          <BaseButton type="submit" text="Save" />
        </div>
      </div>
    </div>
  </div>
)
