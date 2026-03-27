import {useState}  from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Card, CardContent, Typography, CardActionArea } from '@mui/material';

const cards = [
  { id: 1, title: 'Deneyimler', description: 'Tüm iş geçmişini buradan yönet.', path: '/admin/experience' },
  { id: 2, title: 'Projeler', description: 'Portfolyona yeni projeler ekle.', path: '/admin/project' },
  { id: 3, title: 'Kullanıcı', description: 'Kullanıcı bilgilerini düzenle.', path: '/admin/user' },
];

function AdminDashBoard() {
  const [selectedCard, setSelectedCard] = useState(0);
  const navigate = useNavigate(); 

  const handleCardClick = (index, path) => {
    setSelectedCard(index); 
    navigate(path);        
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingY: { xs: 4, md: 10 }, 
        paddingX: 2,              
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
            mb:{xs:7, md:6}, 
            mt:{xs:4, md:6}, 
            fontWeight: 'bold', 
            color: 'rgb(247, 179, 123)',
            textAlign: 'center',       // Mobilde başlık uzunsa ortalansın
            fontSize: { xs: '3rem', md: '3rem' } // Mobilde başlık biraz küçülsün ki taşmasın
        }}
      >
        Yönetim Paneli Anasayfa
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'grid',
          // 350px telefonlar için çok geniştir (iPhone SE 375px'tir). 
          // Bu yüzden min(350px, 100%) diyerek "Ya 350px ol ya da ekranın tamamı kadar ol" dedik.
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
          gap: 4, 
          maxWidth: '1200px', 
        }}
      >
        {cards.map((card, index) => (
          <Card 
            key={card.id} 
            sx={{ 
                minHeight: { xs: '250px', md: '300px' }, // Mobilde biraz daha kısa olabilir
                display: 'flex',
                boxShadow: selectedCard === index ? 15 : 3,
                transition: '0.3s',
                border: '5px solid #e0ff89',
                color: 'rgb(19, 3, 2)',
                bgcolor:'rgb(241, 113, 8)',
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick(index, card.path)}
              sx={{
                height: '100%',
                padding: { xs: 2, md: 4 }, // Mobilde iç boşluğu biraz azalttık ki yazıya yer kalsın
                backgroundColor: selectedCard === index ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              }}
            >
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography 
                    variant="h3" 
                    component="div" 
                    align="center"
                    gutterBottom 
                    sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '3rem' } // Mobilde kart başlığı dev gibi kalmasın
                    }}
                >
                  {card.title}
                </Typography>
                <Typography 
                    variant="h5" 
                    color="text.secondary" 
                    align="center"
                    sx={{ 
                        lineHeight: 1.5,
                        fontSize: { xs: '1.5rem', md: '1.5rem' } // Mobilde açıklama okunabilir olsun
                    }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default AdminDashBoard;

