import { prisma } from '../utils/db.js';

export const handleUpload = async (req, res) => {
  try {
    const uploadedFiles = req.files;

    const jobs = await Promise.all(
      uploadedFiles.map(file => {
        return prisma.conversionJob.create({
          data: {
            originalName: file.originalname,
            fileSize: file.size,
            fromFormat: 'pdf',
            toFormat: 'docx',
            status: 'PENDING'
          }
        });
      })
    );

    res.json({
      message: 'Files saved and jobs created!',
      jobs: jobs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};