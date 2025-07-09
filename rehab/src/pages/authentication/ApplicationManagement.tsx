/* ApplicationManagement.tsx */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Grid,
  TextField,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import paths from 'routes/paths';

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

interface Application {
  id: string;
  socialWorker: string;
  clientName: string;
  status: ApplicationStatus;
  dateReceived: string;
  dateUpdated: string;
  levelOfAddiction: string;
  reason: string;
  submittedDocs: string[];
  substances: string[];
}

// initial list
const initialApplications: Application[] = [
  {
    id: 'APP-001',
    socialWorker: 'Jonath Barren',
    clientName: 'Michael Smith',
    status: 'Pending',
    dateReceived: '2025-07-01',
    dateUpdated: '2025-07-04',
    levelOfAddiction: 'Severe',
    reason: 'Alcohol addiction is disrupting work and family life.',
    submittedDocs: ['Medical_Report.pdf', 'ID_Copy.jpg'],
    substances: ['Alcohol', 'Opioids'],
  },
  // …other items
];

export default function ApplicationManagement() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Pick up approvedId when redirected back
  useEffect(() => {
    const state = (location.state as { approvedId?: string }) || {};
    if (state.approvedId) {
      setApplications((apps) =>
        apps.map((app) =>
          app.id === state.approvedId ? { ...app, status: 'Approved' } : app
        )
      );
      setSnackbar({ open: true, message: `Application ${state.approvedId} approved.` });
      // clear so it won’t re-trigger on re-render
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleCloseSnackbar = () => setSnackbar({ open: false, message: '' });

  const handleAccept = () => {
    if (selectedApp) {
      navigate(
        paths.roomallocation.replace(':id', selectedApp.id)
      );
    }
  };

  const handleDecline = () => {
    if (selectedApp) {
      setApplications((apps) =>
        apps.map((app) =>
          app.id === selectedApp.id ? { ...app, status: 'Rejected' } : app
        )
      );
      setSnackbar({ open: true, message: `Application ${selectedApp.id} declined.` });
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Application Management
      </Typography>

      {selectedApp ? (
        <>
          <Typography variant="h5" align="center" mb={2}>
            Application Details – {selectedApp.clientName}
          </Typography>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date Received"
                value={selectedApp.dateReceived}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Date Updated"
                value={selectedApp.dateUpdated}
                InputProps={{ readOnly: true }}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Level of Addiction"
                value={selectedApp.levelOfAddiction}
                InputProps={{ readOnly: true }}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Substance Type"
                value={selectedApp.substances.join(', ')}
                InputProps={{ readOnly: true }}
                sx={{ mt: 2 }}
              />
              <Typography sx={{ mt: 2 }}>
                <strong>Submitted Documents:</strong>
              </Typography>
              {selectedApp.submittedDocs.map((doc, i) => (
                <Link key={i} href={`/documents/${doc}`} download display="block">
                  📄 {doc}
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Reason for Rehab"
                value={selectedApp.reason}
                multiline
                rows={6}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box border={1} borderColor="grey.300" p={2} borderRadius={2}>
                <Typography variant="subtitle2" mb={1}>
                  File Viewer
                </Typography>
                <Box
                  height={100}
                  bgcolor="grey.100"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  [Document Preview Here]
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <Button variant="contained" color="success" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={handleDecline}>
              Decline
            </Button>
            <Button variant="outlined" onClick={() => setSelectedApp(null)}>
              Back to List
            </Button>
          </Box>
        </>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application No.</TableCell>
                <TableCell>Social Worker</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.socialWorker}</TableCell>
                  <TableCell>{app.clientName}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => setSelectedApp(app)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
