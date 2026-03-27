import { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardActions,
  Button,  Grid, CircularProgress, IconButton, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Business as BusinessIcon } from '@mui/icons-material';
import { useAppDispacth, useAppSelector } from "../Store/Store";
import { 
  fetchExperinces, 
  selectAllExperiences, 
  fetchDeleteExperience, 
  fetchCreateExperience, 
  fetchUpdateExperience 
} from "../Slices/ExperienceSlice";

function ExperinceAdminPanel() {
  const dispatch = useAppDispacth();
  const experiences = useAppSelector(selectAllExperiences);
  const { status, error } = useAppSelector((state) => state.experiences);

  // Modal ve Form State'leri
  const [open, setOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const initialFormState = {
    experienceCompanyName: "",
    experinceMyTitle: "",
    description: "",
    startDate: "",
    endDate: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchExperinces());
  }, [dispatch]);

  // Modal Açma (Ekleme veya Düzenleme)
  const handleOpen = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        ...exp,
        startDate: exp.startDate ? exp.startDate.split('T')[0] : "",
        endDate: exp.endDate ? exp.endDate.split('T')[0] : ""
      });
    } else {
      setEditingExp(null);
      setFormData(initialFormState);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormState);
  };

 
  const handleSave = async () => {
    try {
      if (editingExp) {
        await dispatch(fetchUpdateExperience(formData)).unwrap();
      } else {
        const { id, ...dataToCreate } = formData;
        await dispatch(fetchCreateExperience(dataToCreate)).unwrap();
      }
      dispatch(fetchExperinces());
      handleClose();
    } catch (err) {
      console.error("İşlem başarısız:", err);
    }
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Bu deneyimi silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(fetchDeleteExperience(id)).unwrap();
        
 
        dispatch(fetchExperinces()); 
      } catch (err) {
        console.error("Silme hatası:", err);
      }
    }
  };

  if (status === "pendingFetchExperinces" && experiences.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: 'rgb(241, 113, 8)' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      {/* Üst Kısım */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(71, 71, 107)' }}>
          Deneyim Paneli
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: 'rgb(241, 113, 8)', '&:hover': { bgcolor: 'rgb(200, 90, 5)' } }}
        >
          Yeni Deneyim Ekle
        </Button>
      </Box>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      {/* Deneyim Kartları Grid */}
      <Grid container spacing={3}>
        {experiences.map((exp) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={exp.id}>
            <Card sx={{ 
              height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 4, borderRadius: 2,
              borderTop: '5px solid rgb(241, 113, 8)', transition: '0.2s', '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                  <BusinessIcon sx={{ color: 'rgb(71, 71, 107)' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{exp.experienceCompanyName}</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.experinceMyTitle}</Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {new Date(exp.startDate).toLocaleDateString('tr-TR')} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('tr-TR') : "Devam Ediyor"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ color: '#555' }}>{exp.description}</Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <IconButton color="primary" onClick={() => handleOpen(exp)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(exp.id)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: 'rgb(71, 71, 107)', color: '#fff' }}>
          {editingExp ? "Deneyimi Düzenle" : "Yeni Deneyim Ekle"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField 
                label="Şirket Adı" fullWidth value={formData.experienceCompanyName}
                onChange={(e) => setFormData({...formData, experienceCompanyName: e.target.value})}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Pozisyon / Başlık" fullWidth value={formData.experinceMyTitle}
                onChange={(e) => setFormData({...formData, experinceMyTitle: e.target.value})}
              />
            </Grid>
            <Grid size={6}>
              <TextField 
                label="Başlangıç" type="date" fullWidth InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </Grid>
            <Grid size={6}>
              <TextField 
                label="Bitiş" type="date" fullWidth InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Açıklama" multiline rows={4} fullWidth value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">İptal</Button>
          <Button 
            onClick={handleSave} variant="contained" 
            sx={{ bgcolor: 'rgb(241, 113, 8)' }}
            disabled={status.includes("pending")}
          >
            {editingExp ? "Güncelle" : "Ekle"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ExperinceAdminPanel;