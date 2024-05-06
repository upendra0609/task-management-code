import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubmission } from "../../../store/submissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const submissions = [1, 2, 3];

const SubmissionList = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const { submission } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAllSubmission());
  }, [submission.submission?.length]);

  return (
    <div className={""}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="space-y-2">
              {submission.submission?.length != 0 ? (
                <div className="space-y-2">
                  {submission.submission?.map((item, index) => (
                    <SubmissionCard key={index} submission={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center">No Submission found</div>
              )}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SubmissionList;
