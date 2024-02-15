import { Icon, IconButton, IconButtonProps, LightMode } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Make sure to import the specific icon you want to use

export const FavouriteButton = (props: IconButtonProps) => (
    <>
        <LightMode>
            <IconButton
            isRound
            bg="white"
            color="gray.900"
            size="sm"
            _hover={{ transform: 'scale(1.1)' }}
            sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
            transition="all 0.15s ease"
            icon={<Icon as={FontAwesomeIcon} icon={faHeart} />} // Use Icon component and pass FontAwesomeIcon as 'as' prop
            boxShadow="base"
            {...props}
            />
        </LightMode>
        <LightMode>
            <IconButton
            isRound
            bg="white"
            color="gray.900"
            size="sm"
            _hover={{ transform: 'scale(1.1)' }}
            sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
            transition="all 0.15s ease"
            icon={<Icon as={FontAwesomeIcon} icon={faHeart} />} // Use Icon component and pass FontAwesomeIcon as 'as' prop
            boxShadow="base"
            {...props}
            />
        </LightMode>
    </>
    
);