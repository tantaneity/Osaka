import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

interface ProfileInfoCardProps {
  title: string;
  description?: ReactNode;
  details?: Record<string, string | ReactNode>;
  action?: ReactNode;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  title,
  description,
  details = {},
  action,
}) => {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0">
        {description && (
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            {description}
          </Typography>
        )}
        {description && Object.keys(details).length ? (
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
        {Object.keys(details).length > 0 && (
          <ul className="flex flex-col gap-4 p-0">
            {Object.entries(details).map(([key, value]) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  {key}:
                </Typography>
                {typeof value === "string" ? (
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {value}
                  </Typography>
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
};

export default ProfileInfoCard;
