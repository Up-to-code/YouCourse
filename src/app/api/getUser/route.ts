// app/api/getUser/route.ts

import {  NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest } from 'next';

interface User {
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;
}

export async function GET(req: NextApiRequest) {
  try {
    console.log('Handler started');
    
    const session = await getKindeServerSession(req);
    console.log('Session retrieved:', session);

    if (!session) {
      console.log('No session found');
      return NextResponse.json({ given_name: null ,
        isAuthenticated: false }, { status: 401 });
    }

    const user = await session.getUser();
    const isAuthenticated = await session.isAuthenticated();
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return NextResponse.json({ given_name: null }, { status: 401 });
    }
    console.log('User retrieved:', user);

    const formattedUser: User = {
      given_name: user.given_name || null,
      family_name: user.family_name || null,
      picture: user.picture || null,
    };

    return NextResponse.json(formattedUser, { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ given_name: null }, { status: 500 });
  }
}
