import persons from '~/src/json/persons.json'
import { useRequest, useResponse } from './client'
import { randomIntFromInterval } from '~/src/helpers'
import type { Request } from '~/src/types'
import { HttpStatus } from '~/src/types/enums'

export type Person = {
  name: string
  age: number
  income?: number
}

export type PersonsParams = {
  age_gt?: number
}

type PersonsRequest = Request<PersonsParams, Person[]>

type PersonsResponse = {
  persons: Person[]
  avgIncome: number
}

// function personNameParser(req: PersonsRequest) {
//   req.data = req.data.map(person => {
//     const name = person.name.split(' ').reverse().join(', ')
//     return {
//       ...person,
//       name
//     }
//   })

//   return req
// }

function personAgeFilter(req: PersonsRequest) {
  const { params } = req

  if (params?.age_gt) {
    req.data = req.data.filter(person => person?.age > (params?.age_gt ?? 0))
  }

  return req
}

function getPersonIncome(person: Person): Promise<Person> {
  const delayTime = randomIntFromInterval(500, 1000)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!person.name) {
        reject({
          status: 400,
          message: 'Unexpected API error'
        })
      }

      resolve({
        ...person,
        income: delayTime
      })
    }, delayTime)
  })
}

function getAverageIncome(total: number, person: Person) {
  if (person.income) {
    total = total + person.income
  }

  return total
}

export async function getPersonsIncome(params?: PersonsParams) {
  const { data } = useRequest<PersonsParams, Person[]>({
    params,
    data: persons
  }).use([personAgeFilter])

  const { send } = useResponse()

  try {
    const personsIncome = await Promise.all(data.map(getPersonIncome))
    const avgIncome = personsIncome.reduce(getAverageIncome, 0)

    console.info('Average income: ', avgIncome)

    return send<PersonsResponse>(HttpStatus.SUCCESS, {
      persons: personsIncome,
      avgIncome
    })
  } catch (exception) {
    console.error(exception)
    return send<unknown>(HttpStatus.ERROR, exception)
  }
}
