import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest } from 'next';

export async function middleware(req: NextApiRequest) {
  try {
    console.log('Middleware started');
    
    // الحصول على الجلسة من Kinde
    const session = await getKindeServerSession(req);
    console.log('Session retrieved:', session);

    // التحقق من الجلسة
    if (!session) {
      console.log('No session found');
      return NextResponse.redirect(new URL('/', req.url));
    }

    // التحقق من مصادقة المستخدم
    const isAuthenticated = await session.isAuthenticated();
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return NextResponse.redirect(new URL('/', req.url));
    }

    console.log('User is authenticated');
    return NextResponse.next();
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.redirect(new URL('/error', req.url)); // Redirect to an error page
  }
}

// تحديد المسارات التي ينطبق عليها هذا الميدل وير
export const config = {
  matcher: ['/user/:path*'], // قم بتحديد المسارات التي تريد تطبيق الميدل وير عليها
};
