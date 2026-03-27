import { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardActions, CardMedia,
  Button,Grid, IconButton, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Icon
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Link as LinkIcon} from '@mui/icons-material';
import { useAppDispacth, useAppSelector } from "../Store/store";
import { 
  fetchProjects, 
  selectAllProjects, 
  fetchDeleteProject, 
  fetchCreateProject, 
  fetchUpdateProject 
} from "../Slices/ProjectSlice";

function ProjectsAdminPanel() {
  const dispatch = useAppDispacth();
  const projects = useAppSelector(selectAllProjects);
  const { status, error } = useAppSelector((state) => state.projects);

  const [open, setOpen] = useState(false);
  const [editingProj, setEditingProj] = useState(null);

  const initialFormState = {
    projectName: "",
    projectDescription: "",
    projectImage1: "",
    projectImage2: "",
    projectImage3: "",
    projectImage4: "",
    projectImage5: "",
    projcetTechStack: "", // Interface'deki yazım hatasına (projcet) sadık kaldım
    projectLink: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleOpen = (proj = null) => {
    if (proj) {
      setEditingProj(proj);
      setFormData({ ...proj });
    } else {
      setEditingProj(null);
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
      if (editingProj) {
        await dispatch(fetchUpdateProject(formData)).unwrap();
      } else {
        const { id, ...dataToCreate } = formData;
        await dispatch(fetchCreateProject(dataToCreate)).unwrap();
      }
      dispatch(fetchProjects());
      handleClose();
    } catch (err) {
      console.error("İşlem başarısız:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(fetchDeleteProject(id)).unwrap();
        dispatch(fetchProjects());
      } catch (err) {
        console.error("Silme hatası:", err);
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(71, 71, 107)' }}>
          Projeler Paneli
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: 'rgb(241, 113, 8)', '&:hover': { bgcolor: 'rgb(200, 90, 5)' } }}
        >
          Yeni Proje Ekle
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((proj) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={proj.id}>
            <Card sx={{ 
              height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 4, borderRadius: 2,
              borderTop: '5px solid rgb(241, 113, 8)', transition: '0.2s', '&:hover': { transform: 'translateY(-5px)' }
            }}>
              {/* Ana Resim Olarak projectImage1 Kullanıldı */}
              <CardMedia
                component="img"
                height="180"
                image={proj.projectImage1 || 'https://via.placeholder.com/300x180?text=Resim+Yok'}
                alt={proj.projectName}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(71, 71, 107)' }}>
                  {proj.projectName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgb(241, 113, 8)', fontWeight: 'bold' }}>
                  {proj.projcetTechStack}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {proj.projectDescription}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', p: 2, bgcolor: '#f9f9f9' }}>
                <Box>
                  {proj.projectLink && (
                    <IconButton size="small" component="a" href={proj.projectLink} target="_blank">
                      <LinkIcon color="primary" />
                    </IconButton>
                  )}
                  {/* Görsel sayısı indikatorü */}
                  <IconButton size="small" disabled>
                    <Icon fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {[proj.projectImage1, proj.projectImage2, proj.projectImage3, proj.projectImage4, proj.projectImage5].filter(Boolean).length}
                    </Typography>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpen(proj)}><EditIcon color="primary" fontSize="small" /></IconButton>
                  <IconButton onClick={() => handleDelete(proj.id)}><DeleteIcon color="error" fontSize="small" /></IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FORM MODALI */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: 'rgb(71, 71, 107)', color: '#fff' }}>
          {editingProj ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={8}>
              <TextField label="Proje Adı" fullWidth value={formData.projectName} onChange={(e) => setFormData({...formData, projectName: e.target.value})} />
            </Grid>
            <Grid size={4}>
              <TextField label="Tech Stack" fullWidth value={formData.projcetTechStack} onChange={(e) => setFormData({...formData, projcetTechStack: e.target.value})} />
            </Grid>
            <Grid size={12}>
              <TextField label="Proje Linki (GitHub/Live)" fullWidth value={formData.projectLink} onChange={(e) => setFormData({...formData, projectLink: e.target.value})} />
            </Grid>
            
            {/* Resim URL Alanları */}
            {[1, 2, 3, 4, 5].map((num) => (
              <Grid size={12} key={num}>
                <TextField 
                  label={`Proje Görseli ${num} URL`} 
                  fullWidth 
                  value={formData[`projectImage${num}`]} 
                  onChange={(e) => setFormData({...formData, [`projectImage${num}`]: e.target.value})} 
                />
              </Grid>
            ))}

            <Grid size={12}>
              <TextField label="Proje Açıklaması" multiline rows={3} fullWidth value={formData.projectDescription} onChange={(e) => setFormData({...formData, projectDescription: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">İptal</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: 'rgb(241, 113, 8)' }}>
            {editingProj ? "Güncelle" : "Ekle"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectsAdminPanel;