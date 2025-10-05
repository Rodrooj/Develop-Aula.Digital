import { NextResponse } from 'next/server';
import { getModuleBySlug, getActivitiesByModuleId } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const module = await getModuleBySlug(slug);
    
    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    const activities = await getActivitiesByModuleId(module.id);
    
    return NextResponse.json({
      ...module,
      activities
    });
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { error: 'Failed to fetch module' },
      { status: 500 }
    );
  }
}
