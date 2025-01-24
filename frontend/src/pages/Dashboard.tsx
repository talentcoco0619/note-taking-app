import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Button, Card, Modal, Form, Input, DatePicker } from 'antd';
import { RootState } from '../store';
import { fetchNotes, deleteNote, createNote, updateNote } from '../store/noteSlice';
import { logoutUser } from '../store/authSlice';
import { toast } from 'react-toastify';
import { AudioRecorder } from 'react-audio-voice-recorder';
import moment from 'moment';
import { AppDispatch } from '../store';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading } = useSelector((state: RootState) => state.notes);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out successfully!');
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('date', values.date.format('YYYY-MM-DD'));
        if (audioBlob) {
          formData.append('audio', audioBlob, 'recording.webm');
        }
        dispatch(createNote(formData));
        setIsCreateModalOpen(false);
        form.resetFields();
        setAudioBlob(null);
        toast.success('Note created successfully!');
      })
      .catch((info) => {
        console.error('Validation failed:', info);
      });
  };

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
    setAudioBlob(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
    toast.success('Note deleted successfully!');
  };

  const handleTitleClick = (note: any) => {
    setSelectedNote(note);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedNote(null);
  };

  const handleEditClick = (note: any) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
    form.setFieldsValue({
      title: note.title,
      description: note.description,
      date: moment(note.date),
    });
    setAudioUrl(note.audio || '');
  };

  const handleEditOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('date', values.date.format('YYYY-MM-DD'));
        console.log(values.date)
        if (audioBlob) {
          formData.append('audio', audioBlob, 'recording.webm');
        }
        dispatch(updateNote({ id: selectedNote.id, formData }));
        setIsEditModalOpen(false);
        form.resetFields();
        setAudioUrl('');
        toast.success('Note updated successfully!');
      })
      .catch((info) => {
        console.error('Validation failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    form.resetFields();
    setAudioUrl('');
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.date.includes(searchTerm)
  );

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    setAudioUrl(url)
    setAudioBlob(blob);
  };

  const columns = [
    {
      title: 'No',
      render: (_: string, __: any, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <Button
          type="link"
          onClick={() => handleTitleClick(record)}
          style={{ padding: 0 }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button id='logout-button' onClick={onLogout} className="flex items-center">
          <LogoutOutlined className="mr-1" />
          <p>Log Out</p>
        </button>
      </div>

      {/* Header */}
      <div className="text-center text-4xl font-bold text-gray-600 mb-10">
        Daily Note
      </div>

      {/* Notes Table */}
      <Card
        bordered={false}
        style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '16px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
          <Input
            id="search-notes"
            placeholder="Search notes"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px' }}
          />
          <Button
            id='create_button'
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>

        <Table
          dataSource={filteredNotes}
          columns={columns}
          pagination={false}
          rowKey="id"
          loading={loading}
        />
      </Card>

      {/* Create Note Modal */}
      <Modal
        title="Create New Note"
        open={isCreateModalOpen}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: '',
            description: '',
            date: null,
          }}
        >
          {/* Form Fields */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a note title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a note description!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Audio" name="audio">
            <div className="flex">
              <audio src={audioBlob ? URL.createObjectURL(audioBlob) : ''} controls className="h-[40px] mr-5"></audio>
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                  sampleRate: 16000,
                }}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        title="Edit Note"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a note title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a note description!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Audio">
            <div className="flex">
              <audio src={audioUrl} controls className="h-[40px] mr-5"></audio>
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                  sampleRate: 16000,
                }}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Note Details"
        open={isDetailModalOpen}
        onCancel={handleDetailModalClose}
        footer={null}
        style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '16px' }}
      >
        <Form
          layout="vertical"
          initialValues={{
            title: selectedNote?.title,
            description: selectedNote?.description,
            date: selectedNote?.date ? moment(selectedNote.date).format('YYYY-MM-DD') : null,
          }}
        >
          {/* Title */}
          <Form.Item label="Title" name="title">
            <Input value={selectedNote?.title} />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" name="description">
            <Input.TextArea value={selectedNote?.description} rows={6} />
          </Form.Item>

          {/* Audio */}
          <Form.Item label="Audio" name="audio">
            {selectedNote?.audio ? (
              <div className="flex">
                <audio src={selectedNote.audio} controls style={{ width: '100%' }} />
              </div>
            ) : (
              <p>No audio recorded</p>
            )}
          </Form.Item>

          {/* Date */}
          <Form.Item label="Date" name="date">
            <Input value={selectedNote?.date ? moment(selectedNote.date).format('YYYY-MM-DD') : ''} />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default DashboardPage;
