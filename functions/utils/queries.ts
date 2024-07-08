export const createUserMutation = `
      mutation CreateUser($email: String!, $fname: String!, $mobile: String!, $lname: String!, $wap: String!, $dp: String!) {
        insert_users_one(object: {email: $email, first_name: $fname, mobile: $mobile, last_name: $lname, whatsapp: $wap, diet_preference: $dp}) {
          id
        }
      }
    `;

export const getUserByPhoneNumber = `
    query GetUserByPhoneNumber($mobile: String!) {
      users(where: {mobile: {_eq: $mobile}}) {
        id
        first_name
        last_name
        email
      }
    }
`

export const getUserByEmail = `
    query GetUserByEmail($email: String!) {
      users(where: {email: {_eq: $email}}) {
        id
        first_name
        last_name
        email
      }
    }
`