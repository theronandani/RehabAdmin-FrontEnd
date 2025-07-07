import { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

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

interface House {
  id: string;
  name: string;
  rooms: Room[];
}

interface Room {
  id: string;
  name: string;
  available: boolean;
}

const dummyApplications: Application[] = [
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
];

const housesData: House[] = [
  {
    id: 'house1',
    name: 'House A',
    rooms: [
      { id: 'r1', name: 'Room 1', available: true },
      { id: 'r2', name: 'Room 2', available: false },
      { id: 'r3', name: 'Room 3', available: true },
    ],
  },
  {
    id: 'house2',
    name: 'House B',
    rooms: [
      { id: 'r4', name: 'Room 1', available: true },
      { id: 'r5', name: 'Room 2', available: true },
    ],
  },
];

export default function ApplicationManagement() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [decision, setDecision] = useState<'accept' | 'decline' | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleAssignRoom = () => {
    setRoomDialogOpen(true);
  };

  const handleRoomSave = () => {
    setRoomDialogOpen(false);
    setSnackbarMessage(
      `Room "${selectedRoom?.name}" in "${selectedHouse?.name}" assigned successfully.`
    );
    setOpenSnackbar(true);
  };

  const handleSubmit = () => {
    if (decision === 'accept' && !selectedRoom) {
      setSnackbarMessage('Please assign a room before submitting.');
      setOpenSnackbar(true);
      return;
    }

    if (selectedApp) {
      setSnackbarMessage(
        decision
          ? `Application for ${selectedApp.clientName} ${
              decision === 'accept' ? 'accepted' : 'declined'
            } successfully.`
          : `No decision made for ${selectedApp.clientName}.`
      );
      setOpenSnackbar(true);
    }

    // Reset after submission
    setDecision(null);
    setSelectedRoom(null);
    setSelectedHouse(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Application Management
      </Typography>

      {!selectedApp ? (
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
              {dummyApplications.map((app) => (
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
      ) : (
        <>
          <Typography variant="h5" align="center" mt={4}>
            Application Details - {selectedApp.clientName}
          </Typography>

          <Grid container spacing={3} mt={2}>
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
                value={selectedApp.substances?.join(', ') || ''}
                InputProps={{ readOnly: true }}
                sx={{ mt: 2 }}
              />
              <Typography sx={{ mt: 2 }}>
                <strong>Submitted Documents:</strong>
              </Typography>
              {selectedApp.submittedDocs?.length ? (
                selectedApp.submittedDocs.map((doc, i) => (
                  <Link key={i} href={`/documents/${doc}`} download>
                    📄 {doc}
                  </Link>
                ))
              ) : (
                <Typography>No documents submitted.</Typography>
              )}
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
              <TextField
                fullWidth
                label="Additional Comments"
                value="No comments added"
                multiline
                rows={4}
                InputProps={{ readOnly: true }}
                sx={{ mt: 2 }}
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
              <TextField
                fullWidth
                label="Admin Comments"
                placeholder="Write your comment here..."
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant={decision === 'accept' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setDecision('accept')}
              sx={{
                backgroundColor: decision === 'accept' ? 'green' : undefined,
                '&:hover': {
                  backgroundColor: decision === 'accept' ? '#006400' : undefined,
                },
              }}
            >
              Accept
            </Button>
            <Button
              variant={decision === 'decline' ? 'contained' : 'outlined'}
              color="error"
              onClick={() => setDecision('decline')}
            >
              Decline
            </Button>

            {decision === 'accept' && (
              <Button variant="contained" onClick={handleAssignRoom}>
                Assign Room
              </Button>
            )}

            {decision && (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit Changes
              </Button>
            )}
          </Box>

          <Box textAlign="center" mt={4}>
            <Button variant="outlined" onClick={() => setSelectedApp(null)}>
              Back to Application List
            </Button>
          </Box>
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('assign') ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Assign Room Dialog */}
      <Dialog open={roomDialogOpen} onClose={() => setRoomDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Room</DialogTitle>
        <DialogContent>
          {!selectedHouse ? (
            <>
              <Typography>Select a House</Typography>
              <List>
                {housesData.map((house) => (
                  <ListItem disablePadding key={house.id}>
                    <ListItemButton onClick={() => setSelectedHouse(house)}>
                      <ListItemText primary={house.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <>
              <Typography>Rooms in {selectedHouse.name}</Typography>
              <List>
                {selectedHouse.rooms
                  .filter((room) => room.available)
                  .map((room) => (
                    <ListItem disablePadding key={room.id}>
                      <ListItemButton onClick={() => setSelectedRoom(room)}>
                        <ListItemText
                          primary={room.name}
                          secondary={selectedRoom?.id === room.id ? 'Selected' : ''}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedHouse && (
            <Button onClick={() => setSelectedHouse(null)}>Back</Button>
          )}
          {selectedRoom && (
            <Button variant="contained" onClick={handleRoomSave}>
              Save Assignment
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
