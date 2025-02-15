import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconEdit, IconSearch, IconTrash } from '../../../../assets/icons'
import { BaseBadge } from '../../../../components/BaseBadge'
import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { Pagination } from '../../../../components/Pagination'
import { AppContext } from '../../../../services/AppContext'

import './DashboardTable.css'

interface Props {
  data: { pets: Pet[] | undefined; total: number | undefined }
  page: number
  setPage(skip: number): void
  handleEdit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ): void
  handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    petId: string,
    userRole: string,
  ): void
  searchByName: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreatePet: () => void
}

interface Pet {
  id: string // or number, if the ID is numeric
  age: string // or number, depending on the data type you're using for age
  name: string
  size: string
  gender: string
  category: string
  images: string[] // An array of image URLs (strings)
  adopted: boolean
  description: string
}

export const DashboardTable: React.FC<Props> = ({
  data,
  page,
  setPage,
  handleEdit,
  handleDelete,
  searchByName,
  handleSearch,
  handleCreatePet,
}) => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const goToPet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  return (
    <>
      <div className="flex justify-between sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Pets
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the pets in your place.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <BaseButton
            size="small"
            type="button"
            text="Add pet"
            style="primary"
            onClick={handleCreatePet}
          />
        </div>
      </div>
      <div className="mt-5">
        <BaseInput
          type="text"
          value={searchByName}
          placeholder="Search"
          label="Search by name"
          iconLeft={<IconSearch />}
          handleChange={handleSearch}
        />
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-2"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.pets &&
                  data?.pets.map((pet: Pet) => (
                    <tr
                      key={pet.id}
                      onClick={() => goToPet(pet.id)}
                      className="hover:bg-primary-200 cursor-pointer"
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-2">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full"
                              src={pet?.images[0]}
                              alt="pet-image"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="capitalize font-medium text-gray-900">
                              {pet.name}
                            </div>
                            <div className="truncate w-[250px] mt-1 text-gray-500">
                              {pet.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {pet.gender}
                      </td>
                      <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {pet.category}
                      </td>
                      <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {pet.age}
                      </td>
                      <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {pet.size}
                      </td>
                      <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <BaseBadge
                          color={pet.adopted ? 'text-green-50' : 'bg-green-200'}
                          backgroundColor={
                            pet.adopted ? 'bg-red-500' : 'bg-green-200'
                          }
                          text={pet.adopted ? 'Adopted' : 'Available'}
                        />
                      </td>
                      <td className="capitalize flex justify-end items-center gap-4 whitespace px-3 py-5 text-sm text-gray-500">
                        <BaseButton
                          style="tertiary"
                          onClick={(e) => handleEdit(e, pet.id)}
                          icon={
                            <div className="svg-trash">
                              <IconEdit />
                            </div>
                          }
                        />
                        <BaseButton
                          style="tertiary"
                          onClick={(e) =>
                            handleDelete(e, pet.id, user?.role || '')
                          }
                          icon={
                            <div className="svg-trash">
                              <IconTrash />
                            </div>
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          take={10}
          page={page}
          setPage={setPage}
          total={data?.total || 0}
        />
      </div>
    </>
  )
}
