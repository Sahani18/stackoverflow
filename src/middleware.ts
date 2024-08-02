import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrConnectDB from './models/server/dbSetup'
import getOrCreateStorageBucket from './models/server/storageSetup'


export async function middleware(request: NextRequest) {
    await Promise.all([
        getOrConnectDB(),
        getOrCreateStorageBucket()
    ])
    return NextResponse.next()
}

// whatever path matches in the matcher.. our above function will not run for those matched path
// here i'm excluding the paths like- api,_next/static,_next/images,favicon
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ],
}