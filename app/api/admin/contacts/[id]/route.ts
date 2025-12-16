import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// PATCH - Update contact status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const contactId = params.id;

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    if (!status || !['new', 'read', 'replied', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (new, read, replied, closed)' },
        { status: 400 }
      );
    }

    const contactsCol = await getCollection('contacts');
    const { ObjectId } = await import('mongodb');

    const result = await contactsCol.updateOne(
      { _id: new ObjectId(contactId) },
      {
        $set: {
          status,
          updated_at: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully'
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact status' },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contactId = params.id;

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const contactsCol = await getCollection('contacts');
    const { ObjectId } = await import('mongodb');

    const result = await contactsCol.deleteOne({
      _id: new ObjectId(contactId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}