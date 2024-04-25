import { auth } from "@clerk/nextjs"

export const isAdmin = () => {
    const { userId } = auth()

    if (!userId) return false

    if (userId === process.env.ADMIN_ACCOUNT_ID!) {
        return true
    }
}