import { BaseBadge } from '../../../../components/BaseBadge'

interface IVaccine {
  vaccine: {
    id: string
    name: string
    description: string
  }
}

interface VaccinesTableProps {
  vaccines: IVaccine[]
}

export const VaccinesTable: React.FC<VaccinesTableProps> = ({ vaccines }) => (
  <>
    <div className="sm:flex sm:items-center"></div>
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Vaccune
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {vaccines &&
                  vaccines.map((item) => (
                    <tr key={item.vaccine.id}>
                      <td className="flex flex-col py-4 pl-4 pr-3sm:pl-6">
                        <div className="text-sm font-medium text-gray-900 ">
                          {item.vaccine.name}
                        </div>
                        <div className="text-gray-400 truncate w-[350px]">
                          {item.vaccine.description}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <BaseBadge
                          text="Pending"
                          backgroundColor="bg-yellow-300"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
)
